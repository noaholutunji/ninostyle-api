const express = require('express')
const Cart = require('../models/cart')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/products/cart', auth, async (req, res) => {
    const cart = new Cart({
        ...req.body,
        owner: req.user._id
    })

    try {
        await cart.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router


// router.get('/campgrounds', auth, async (req, res) => {
//     const match = {}
//     const sort = {}

//     if (req.query.completed) {
//         match.completed = req.query.completed === 'true'
//     }

//     if (req.query.sortBy) {
//         const parts = req.query.sortBy.split(':')
//         sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
//     }

//     try {
//         await req.user.populate({
//             path: 'campgrounds',
//             match,
//             options: {
//                 limit: parseInt(req.query.limit),
//                 skip: parseInt(req.query.skip),
//                 sort
//             }
//         }).execPopulate()
//         res.send(req.user.campgrounds)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.get('/campgrounds/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try {
//         const campground = await Campground.findOne({ _id, owner: req.user._id })

//         if (!campground) {
//             return res.status(404).send()
//         }

//         res.send(campground)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/campgrounds/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'price', 'image', 'description']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const campground = await Campground.findOne({ _id: req.params.id, owner: req.user._id})

//         if (!campground) {
//             return res.status(404).send()
//         }

//         updates.forEach((update) => campground[update] = req.body[update])
//         await campground.save()
//         res.send(campground)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/campgrounds/:id', auth, async (req, res) => {
//     try {
//         const campground = await Campground.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

//         if (!campground) {
//             res.status(404).send()
//         }

//         res.send(campground)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router