interface Props {
  header: string
  children: React.ReactNode
  size?: string
}

const MyContainer = ({ header, children, size = 'max-w-lg' }: Props) => {
  return (
    <div
      className={`MyContainer mx-auto  bg-gray-100 rounded-md shadow-lg border border-gray-200 text-gray-600  ${size} select-none mt-3`}
    >
      <div className="theme-surface border border-b-4 border-gray-300 rounded-t-md mb-3">
        <h4 className="mb-0 p-2">{header}</h4>
      </div>
      <div className="p-2">{children}</div>
    </div>
  )
}

export default MyContainer
