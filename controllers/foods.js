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

// This route will create new foods in the embedded pantry array on the user model.
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id) // Look up the user from req.session
        currentUser.foods.push(req.body) // Push req.body (the new form data object) to the pantry array of the current user.
        await currentUser.save() // Save changes to the user.
        res.redirect(`users/${currentUser._id}/wines`) // Redirect back to the application’s index view.
    } catch (error){
        console.log(error)
        res.redirect('/') // If any errors, log them and redirect back home /.
    }
})

router.delete('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.foods.id(req.params.foodsId).deleteOne()
        await currentUser.save()
        res.re(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router;
