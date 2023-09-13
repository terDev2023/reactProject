import { ToggleGroup } from "@/components/ToggleGroup"
import { BackPageButton } from "@/components/BackPageButtons"
import { useRouter } from 'next/router'

export default function Buttons() {

  const router = useRouter()

  return (
    <div>
      <ToggleGroup />
      <BackPageButton href='/my/input'/>  
      <button type="button" onClick={() => router.back()}>
      Click here to go back
      </button>        
    </div>
  )
  }