import { PageInput } from '@/components/PageInput';
import { BackPageButton } from '@/components/BackPageButtons';
import { NewModalWindow } from '@/components/NewModalWindow/NewModalWindow';
import { BasicTable } from '@/atoms/table/BasicTable';
 

  

export default function InputSecond() {

  return (
    <div>
      <PageInput placeholder='Give me a text'/>
      <BasicTable />
      <BackPageButton href='/mybuttons' /> 
    </div> 
  )
}