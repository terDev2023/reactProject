import styles from './ModalActivator.module.css'

interface IProps {
    buttonText?: string
    onClick: () => void
    className?: string
}

const ModalActivator = (props: IProps) => {
    const {buttonText, onClick, className} = props
    return (
        <div className={styles.modalActivator}>
            <button className={className} onClick={onClick}><span>{buttonText}</span></button>
        </div>
    )
}

export default ModalActivator