import { CalculatorContextProvider, useCalculaytorContext } from '@/context/CalculatorContext';
import  LayoutCalculator  from '@/components/Layouts/LayoutCalculator'

export default function InputFirst() {
  const {valueCalculator} = useCalculaytorContext()
  // valueCalculator = String(valueCalculator)
  return (
    <CalculatorContextProvider>
      <LayoutCalculator/>
    </CalculatorContextProvider>
  );
}
