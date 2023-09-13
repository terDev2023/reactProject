import { useCalculaytorContext } from "@/context/CalculatorContext"
import { PageInput } from '@/components/PageInput';
import { BackPageButton } from '@/components/BackPageButtons';
import { Calculator } from '@/components/Calculator';

const LayoutCalculator = () => {
    const {valueCalculator} = useCalculaytorContext()

    return(
        <div>
        <PageInput placeholder={String(valueCalculator)}/>
        <Calculator />
        <BackPageButton href='/my' />
        </div>
    )
}

export default LayoutCalculator