import { ToggleGroup } from '../components/ToggleGroup'
import { PageInput } from '@/components/PageInput';
import { BackPageButton } from '@/components/BackPageButtons';

const Index = () => {
  return (
    <div className="buttonsAndToggle">
        <ToggleGroup />
        <PageInput />
        <BackPageButton href='/my'/>  
    </div>

  )  

}

export default Index;
