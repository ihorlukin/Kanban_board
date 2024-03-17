export interface Task {
  id: string
  sectionId: string
  title: string
  content: string
  position: number
}

export interface RequestUpdateTaskPosition {
  resourceList: Task[]
  destinationList: Task[]
  resourceSectionId: string
  destinationSectionId: string
}
