import PreviewButton from "./PreviewButton"
import SubmitPropertyButton from "./SubmitPropertyButton"

const ActionButtons = ({property}) => {
  return (
    <div className="w-full flex items-center gap-2">
        <PreviewButton property={property}/>
        <SubmitPropertyButton  property={property}/>

    </div>
  )
}

export default ActionButtons