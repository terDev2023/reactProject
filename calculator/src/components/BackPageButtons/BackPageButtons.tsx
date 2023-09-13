import React from 'react'
import styles from './BackPageButton.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'


interface IProps {
    href: string
}

const BackPageButton = (props: IProps) => {
    let { href } = props;

    const router = useRouter()

    return (
        <Link href={href} replace={true} className={styles.a}>
            <button className={styles.bubblyButton} onClick={() => router.push(href)}>
                to {href}
            </button>
        </Link>
    )
}

export default BackPageButton;
