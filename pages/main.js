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


    const fetchGame = async (gameId) => {
        try {
            console.log('here')
            const { data } = await axios.get(`https://lichess.org/game/export/${gameId}`, { headers: { 'Accept': 'application/json' } })
            console.log(data)
            return JSON.stringify(data)
        } catch (err) {
            console.error(err)
        }
    }

    const moveGame = (source, destination, item) => {
        let sourceClone = [...source]
        let destinationClone = [...destination]

        sourceClone = sourceClone.filter(i => i.id !== item.id)
        destinationClone.unshift(item) 

        return {a: sourceClone, b: destinationClone}
    }

    const addGame = event => {
        if(value.includes('https://lichess.org/') && cards.filter(c => c.link === value).length === 0){
            const card = new Game(value)
            return card
        }
    }

    useEffect(() => {
        // setInterval(() => {
        //     join.map( c => {
        //         //console.log(c.link)
        //         //console.log(c.id)
        //         fetchGame(c.id).then((data) => {
        //             const obj = JSON.parse(data)
        //             if(obj.status === 'started'){
        //                 console.log('started')
        //                 c.updateJson(obj)
        //                 let {a, b} = moveGame(join, spec, c)
        //                 setJoin(a)
        //                 setSpec(b)
        //             }
        //         })
        //     })
        //     spec.map( c => {
        //         fetchGame(c.id).then((data) => {
        //             const obj = JSON.parse(data)
        //             if(obj.status !== 'started'){
        //                 let {a, b} = moveGame(spec, end, c)
        //                 setSpec(a)
        //                 setEnd(b)
        //             }
        //         })
        //     })
        // }, 5000)
    })

    const sendNew = (link) => {
        socket.emit('new', link)
    }

    socket.on('connect', socket => {
        console.log('connected')
    })

    socket.on('UpdateGames', data => {
        const {j, s, e} = JSON.parse(data)

        let temp = []
        j.map( i => {
            temp.push(new Game(i.link))
            temp[temp.length -1].update(i.id, i.black, i.white)
        })
        setJoin(temp)
        temp = []


        s.map(i => {
            temp.push(new Game(i.link))
            temp[temp.length -1].update(i.id, i.black, i.white)
        })
        setSpec(temp)
        temp = []


        e.map(i => {
            temp.push(new Game(i.link))
            temp[temp.length -1].update(i.id, i.black, i.white)
        })
        setEnd(temp)
        temp = []

        // setJoin(join)
        // setSpec(spec)
        // setEnd(end)
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