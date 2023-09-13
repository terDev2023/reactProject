import styles from './ModalButton.module.css'
import Image from 'next/image'

interface IProps {
    img: string,
    alt: string,
    onClick: () => void
}

const ModalButton = (props: IProps) => {
    const { img, alt, onClick} = props


    return (
        <div>
            <button onClick={onClick} className={styles.buttonModal}>
                <Image src={img} width={20} height={20} alt={alt}/>
            </button>
        </div>
    )
}

export default ModalButton