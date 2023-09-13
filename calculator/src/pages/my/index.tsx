import { PageInput } from '@/components/PageInput';
import { BackPageButton } from '@/components/BackPageButtons';
import { ModalWindow } from '@/components/ModalWindow';
 

  

export default function InputSecond() {

  return (
    <div>
      <PageInput />
      <ModalWindow />
      <BackPageButton href='/mybuttons' /> 
    </div>
  )
}