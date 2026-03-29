interface Props {
  header: string
  children: React.ReactNode
}

const MyContainer = ({ header, children }: Props) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-lg border border-gray-200 text-gray-600">
      <h4 className="mb-3">{header}</h4>
      {children}
    </div>
  )
}

export default MyContainer
