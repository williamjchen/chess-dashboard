import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/card'
import Board from '../components/board'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'

export default function main() {

    const [join, setJoin] = useState([])
    const [spec, setSpec] = useState([])
    const [end, setEnd] = useState([])


    const fetchGame = async (gameId) => {
        try {
            const { data } = await axios.get(`https://lichess.org/game/export/${gameId}`, { headers: { 'Accept': 'application/json' } })
            console.log(data)
            return JSON.stringify(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        setInterval(() => {
            fetchGame('FFHOBXVr').then((data) => {
                const obj = JSON.parse(data)
                console.log(obj)
                console.log('hi')
                if(obj.status === 'started'){
                    setSpec(spec.concat(obj))
                    console.log(spec)
                }
            })
        }, 5000)
    })

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