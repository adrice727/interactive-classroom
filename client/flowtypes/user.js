declare type User = {
  id: string,
  email: string,
  name: string,
  role: 'student' | 'instructor',
  imageURL?: string
}