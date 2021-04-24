import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/card'
import Board from '../components/board'
import NewBoard from '../components/newboard'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'

const Game = require('../components/game')
const socket = io('http://localhost:8080')

export default function main() {

    const [join, setJoin] = useState([])
    const [spec, setSpec] = useState([])
    const [end, setEnd] = useState([])

    const sendNew = (link) => {
        socket.emit('new', link)
    }

    socket.on('connect', socket => {
        console.log('connected')
    })

    socket.on('UpdateGames', data => {
        const {j, s, e} = JSON.parse(data)

        let temp = []
        j.map( item => {
            temp.push(new Game(item))
        })
        setJoin(temp)


        temp = []
        s.map(item => {
            temp.push(new Game(item))
        })
        setSpec(temp)


        temp = []
        e.map(item => {
            temp.push(new Game(item))
        })
        setEnd(temp)
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
                        <NewBoard title='Join Game' cards={join} addCard={setJoin} sendNew={sendNew}/>
                        <Board title='Spectate Game' cards={spec}/>
                        <Board title='Past Games' cards={end}/>
                    </div>
                </div>
            </main>
        </div>
    )
}