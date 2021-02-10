import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/card'
import Board from '../components/board'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function main() {

    const [join, setJoin] = useState([])
    const [spec, setSpec] = useState([])
    const [end, setEnd] = useState([])

    return (
        <div className={styles.container}>
            <Head>
                <title>Chess</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.boardContainer}>
                    <div className={styles.row}>
                        <Board title='Join Game' cards={join}/>
                        <Board title='Spectate Game' cards={spec}/>
                        <Board title='Past Games' cards={end}/>
                    </div>
                </div>
            </main>
        </div>
    )
}