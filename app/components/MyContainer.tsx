interface Props {
  header: string
  children: React.ReactNode
  size?: string
}

const MyContainer = ({ header, children, size = 'max-w-lg' }: Props) => {
  return (
    <div
      className={`MyContainer mx-auto p-6 bg-gray-100 rounded-md shadow-lg border border-gray-200 text-gray-600 mt-3 ${size} select-none`}
    >
      <h4 className="mb-3">{header}</h4>
      {children}
    </div>
  )
}

export default MyContainer
