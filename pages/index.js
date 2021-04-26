import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/card'
import Board from '../components/board'
import NewBoard from '../components/newboard'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import React from 'react'
import io from 'socket.io-client'

const Game = require('../components/game')
const socket = io(process.env.NEXT_PUBLIC_HOST)


export default function Home() {

    const [join, setJoin] = useState([])
    const [spec, setSpec] = useState([])
    const [end, setEnd] = useState([])

    const sendNew = (link) => {
        socket.emit('new', link)
    }

    useEffect(() => {
        socket.on('connect', socket => {
            console.log('connected')
        })
    
        socket.on('UpdateGames', data => {
            const {j, s, e} = JSON.parse(data)
    
            setJoin(j.map(item => new Game(item)))
    
            setSpec(s.map(item => new Game(item)))
    
            setEnd(e.map(item => new Game(item)))
        })
        

        return () => socket.off('UpdateGames', listener)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Chess</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.boardContainer}>
                    <div className={styles.row}>
                        <NewBoard title='Join Game' cards={join} addCard={setJoin} sendNew={sendNew}/>
                        <Board title='Spectate Game' cards={spec}/>
                        <Board title='Past Games' cards={end}/>
                    </div>
                </div>
            </main>
        </div>
    )
}