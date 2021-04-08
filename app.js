const express = require('express')
const app = express()

const fs = require('fs')

app.set('view engine', 'pug')

const DB = './data/notes.json' 

app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

//localhost:7000
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/create', (req, res) => {
	res.render('create')
})

app.post('/create', (req, res) => {
	const title = req.body.title
	const desc = req.body.description

	if (title.trim() !== '' && desc.trim() !== '') {
		
		fs.readFile(DB, (err, data) => {
			if (err) throw err

			const notes = JSON.parse(data)

			notes.push({
				id: id(),
				title: title,
				description: desc,
			})

			fs.writeFile(DB, JSON.stringify(notes), err => {
				if (err) throw err

				res.render('create', { success: true })
			})

		})

	} else {
		res.render('create', { error: true })
	}	
})


const notes = ['Blog updates','Blog updates 2']

app.get('/notes', (req, res) => {

	fs.readFile(DB, (err, data) => {
		if (err) throw err

		const notes = JSON.parse(data)

		res.render('notes', { noteList: notes })
	})
})

app.get('/notes/:id', (req, res) => {

	const id = req.params.id

	fs.readFile(DB, (err, data) => {
		if (err) throw err

		const notes = JSON.parse(data)

		const note = notes.filter(note => note.id == id)[0]
	
        res.render('detail', { noteDetail: note })

		
	})
})



app.delete('/notes/:id', (req, res) => {
    const id = req.params.id

})

app.listen(7000,err => {
    if (err) console.log(err)
    console.log('Everything is working')
})



function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }