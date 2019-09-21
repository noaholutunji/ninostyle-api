const express = require('express')
const Product = require('../models/product')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/products', async (req, res) => {
    const product = new Product({
        ...req.body,
        // owner: req.user._id
    })

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/products', (req, res) => {
    console.log('hit');
     Product.find({}, function(err, products) {
        if(err){
            res.status(500).send()
        } else {
            res.status(200).send(products)
        }
     });
   })

router.get('/products/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const product = await Product.findOne({ _id, owner: req.user._id })

        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/products/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'price', 'image', 'brand', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const product = await Product.findOne({ _id: req.params.id, owner: req.user._id})

        if (!product) {
            return res.status(404).send()
        }

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/products/:id', auth, async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!product) {
            res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router