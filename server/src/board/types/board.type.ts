export interface Board {
  id: string
  userId: string
  icon: string
  title: string
  description: string
  position: number
  favourite: Boolean
  favouritePosition: number
}


export interface Task {
    id: string,
    sectionId: string,
    title: string,
    content: string,
    position: number
}

  export interface Section {
    id: string,
    boardId: string,
    title: string,
    tasks?: Task[]
  }