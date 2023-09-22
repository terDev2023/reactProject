import styles from './ModalButton.module.css'
import Image from 'next/image'

interface IProps {
    img: string,
    alt: string,
    onClick: () => void
    disabled?: boolean
    className?: string
}

const ModalButton = (props: IProps) => {
    const { img, alt, onClick, disabled, className} = props


    return (
            <button onClick={onClick} className={className} disabled={disabled}>
                <Image src={img} width={20} height={20} alt={alt}/>
            </button>
    )
}

export default ModalButton