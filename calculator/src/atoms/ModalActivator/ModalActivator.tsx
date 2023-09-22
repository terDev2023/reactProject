import styles from './ModalActivator.module.css'

interface IProps {
    buttonText?: string
    onClick: () => void
    className?: string
    disabled?: boolean
}

const ModalActivator = (props: IProps) => {
    const {buttonText, onClick, className, disabled} = props
    return (
        <div className={styles.modalActivator}>
            <button className={className} onClick={onClick} disabled={disabled}><span>{buttonText}</span></button>
        </div>
    )
}

export default ModalActivator