import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import sectionApi from '../../api/sectionApi';
import taskApi from '../../api/taskApi';
const initialState = { sections: [] }

export const fetchSections = createAsyncThunk(
  "section/fetchSections",
  async (boardId, {dispatch, rejectWithValue}) => {
    try {
      const res = await sectionApi.getAll(boardId)
      console.log(res)
      dispatch(setSections(res.data))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
);

export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async ({boardId, sectionId}, {dispatch, rejectWithValue}) => {
    try {
      const res = await sectionApi.delete(boardId, sectionId)
      if(res.success) return sectionId
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
);

export const updateSectionTitle = createAsyncThunk(
  "section/updateSection",
  async ({boardId, sectionId, title}, {dispatch, rejectWithValue}) => {
    try {
      console.log(boardId)
      const res = await sectionApi.update(boardId, sectionId, {title});

      if(res.success) dispatch(updateSection({sectionId, title}));

    } catch (error) {
      rejectWithValue(error.message)
    }
  }
);

export const createSection = createAsyncThunk(
  "section/createSection",
  async (boardId, {dispatch, rejectWithValue}) => {
    try {
      const res = await sectionApi.create(boardId)
      return res
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
);

export const createTaskAsync = createAsyncThunk(
  "section/createTask",
  async ({boardId, sectionId}, {dispatch, rejectWithValue}) => {
    try {
      const res = await taskApi.create(boardId, {sectionId})
      console.log(res)
      dispatch(createTask({task: res, sectionId}))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
);

export const updateTaskAsynk = createAsyncThunk(
  "section/updateTask",
  async ({boardId, task}, {dispatch, rejectWithValue}) => {
    const taskId = task.id
    try {
      const res = await taskApi.update(boardId, taskId, task)
      dispatch(updateTask({taskId: task.id, sectionId: task.sectionId, task}))
    } catch (error) {
      console.log(error.message)
      rejectWithValue(error.message)
    }
  }
);

export const deleteTaskAsynk = createAsyncThunk(
  "section/deleteTask",
  async ({boardId, task}, {dispatch, rejectWithValue}) => {
    try {
      const taskId = task.id
      await taskApi.delete(boardId, taskId)
      dispatch(deleteTask({
        taskId: task.id, sectionId: task.sectionId
      }))
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
);

export const sectionSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload
    },
    createSection: (state, action) => {
      state.sections = [...state.sections, action.payload]
    },
    updateSection: (state, action) => {
      state.sections = state.sections.map(section => {
        if(section.id === action.payload.sectionId) {
          return {...section, title: action.payload.title}
        }
        return section
      })
    },
    createTask: (state, action) => {
      const { task, sectionId } = action.payload;
      if (task) {
        state.sections = state.sections.map((section) => {
          if (section.id === sectionId) {
            section.tasks = [task, ...section.tasks];
            return section;
          } else {
            return section;
          }
        });
      }
    },
    updateTask: (state, action) => {
      const { taskId, sectionId, task } = action.payload;

        state.sections = state.sections.map((section) => {
          if (section.id === sectionId) {
            section.tasks = section.tasks.map(t => {
              if(t.id === taskId) return {...task}
              return t
            });
            return section;
          } else {
            return section;
          }
        });
    },
    deleteTask: (state, action) => {
      const { taskId, sectionId } = action.payload;

        state.sections = state.sections.map((section) => {
          if (section.id === sectionId) {
            section.tasks = section.tasks.filter(t => t.id !== taskId);
            return section;
          } else {
            return section;
          }
        });
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSection.fulfilled, (state, action) => {
        // Добавляем новую секцию в массив секций
        state.sections = [...state.sections, action.payload]
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.sections = state.sections.filter(section => section.id !== action.payload)
      })
  },
})

export const { setSections, updateSection, createTask, updateTask, deleteTask} = sectionSlice.actions

export default sectionSlice.reducer