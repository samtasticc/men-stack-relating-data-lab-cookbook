const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('foods/index.ejs', {
            pantry: currentUser.pantry
        })
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
})

router.get('/:foodsId/edit', async (req, res) => { 
    try {
        const currentUser = await User.findById(req.session.user._id) 
        const editFood = currentUser.pantry.id(req.params.foodsId)
        console.log(editFood)
        res.render('foods/edit.ejs', {
            pantry: editFood
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id) 
        currentUser.pantry.push(req.body) 
        await currentUser.save() 
        res.redirect(`/users/${currentUser._id}/foods`) 
    } catch (error){
        console.log(error)
        res.redirect('/') 
    }
})

router.put('/:foodsId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const updateFood = currentUser.pantry.id(req.params.foodsId) // does foodsId need to be pantryId?
        updateFood.set(req.body) 
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        res.redirect('/')
    }
})

router.delete('/:foodsId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.id(req.params.foodsId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router;
