import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import sectionApi from '../../api/sectionApi'
import taskApi from '../../api/taskApi'
import TaskModal from './TaskModal'
import { useDispatch, useSelector } from 'react-redux'
import { createSection,  createTaskAsync,  deleteSection, deleteTaskAsynk, fetchSections, setSections, updateSectionTitle, } from '../../redux/features/sectionSlice'
import Loading from './Loading'
import { debounce, useDebounce } from '../../utils/useDebounce'

let timer;
const Kanban = ({ boardId }) => {
  const [selectedTask, setSelectedTask] = useState(undefined)
  const sections = useSelector(state => state.section.sections)
  console.log(sections)
  const dispatch = useDispatch()

   const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;

    const sourceColIndex = sections.findIndex(e => e.id === source.droppableId);
    const destinationColIndex = sections.findIndex(e => e.id === destination.droppableId);
    const sourceCol = sections[sourceColIndex];
    const destinationCol = sections[destinationColIndex];
    
    const sourceSectionId = sourceCol.id;
    const destinationSectionId = destinationCol.id;
    
    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];
    
     try {
      const sections = {
          resourceList: sourceTasks,
          destinationList: destinationTasks,
          resourceSectionId: sourceSectionId,
          destinationSectionId: destinationSectionId,
          boardId: boardId
       }
       
       const res = await taskApi.updatePosition(boardId, sections )
       console.log(res)
       dispatch(setSections(res))
     } catch (err) {
       console.log(err.message)
     }
   }

  useEffect(() => {
    dispatch(fetchSections(boardId))
  },[boardId])

  const updateSection = (title, sectionId) => {
   dispatch(updateSectionTitle({boardId, sectionId, title: title}))
  }

   const createTask = (sectionId) => {
    dispatch(createTaskAsync({boardId, sectionId}))
    
   }


   const onDeleteTask = async (task) => {
    dispatch(deleteTaskAsynk({boardId, task}))
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button onClick={() => dispatch(createSection(boardId))}>
          Add section
        </Button>
        <Typography variant='body2' fontWeight='700'>
          {sections?.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: 'calc(100vw - 400px)',
          overflowX: 'auto'
        }}>
          {
           sections ? sections.length > 0 ? sections.map(sec => (
              <div key={sec.id} style={{ width: '300px' }}>
                <Droppable key={sec.id} droppableId={sec.id}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ width: '300px', padding: '10px', marginRight: '10px' }}
                    >
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}>
                        <TextField
                          value={sec.title}
                          onChange={(e) => updateSection(e.target.value, sec.id)}
                          placeholder='Untitled'
                          variant='outlined'
                          sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                            '& .MuiOutlinedInput-root': { fontSize: '1rem', fontWeight: '700' }
                          }}
                        />
                        <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'green' }
                          }}
                          onClick={() => createTask(sec.id)}
                        >
                          <AddOutlinedIcon />
                        </IconButton>
                        <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'red' }
                          }}
                          onClick={() => dispatch(deleteSection({boardId, sectionId: sec.id}))}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </Box>
                      {/* tasks */}
                      {
                       sec.tasks && sec.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  padding: '10px',
                                  marginBottom: '10px',
                                  cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                }}
                                onClick={() => setSelectedTask(task)}
                              >
                                <Typography>
                                  {task.title === '' ? 'Untitled' : task.title}
                                </Typography>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      }
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </div>
            ))
          : <div>There is no sections</div> : (<Loading/>)}
        </Box>
      </DragDropContext>
      <TaskModal
        task={selectedTask}
        boardId={boardId}
        onDelete={onDeleteTask}
      />
    </>
  )
}

export default Kanban