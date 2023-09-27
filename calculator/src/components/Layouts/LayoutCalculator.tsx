import { useCalculaytorContext, CalculatorContextProvider } from "@/context/CalculatorContext"
import { PageInput } from '@/components/PageInput';
import { BackPageButton } from '@/components/BackPageButtons';
import { Calculator } from '@/components/Calculator';

const LayoutCalculator = () => {
    const {valueCalculator} = useCalculaytorContext()
    console.log(valueCalculator)
    return(
        <CalculatorContextProvider>
        <PageInput placeholder={String(valueCalculator)}/>
        <Calculator />
        <BackPageButton href='/my' />
        </CalculatorContextProvider>
    )
}

export default LayoutCalculator