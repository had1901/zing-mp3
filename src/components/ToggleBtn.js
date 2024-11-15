import { useState } from 'react'
import { Switch } from '@headlessui/react'

function ToggleBtn({ onToggleChange, classNameParent }) {
  const [enabled, setEnabled] = useState(false)

  const handleChange = (newState) => {
    setEnabled(newState);
    onToggleChange(newState) 
  }
  return (
    <div className={classNameParent}>
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={`${enabled ? ' bg-teal-700' : 'bg-gray-500'}
          relative inline-flex h-16px w-28px shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-3' : 'translate-x-0'}
            pointer-events-none inline-block h-12px w-12px transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
export default ToggleBtn