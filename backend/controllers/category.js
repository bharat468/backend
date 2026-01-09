import category from "../models/categoryModel.js"


export async function getcategory(req, res) {
    try {
        const data = await category.find()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function addcategory(req, res) {
    try {
        const { name, slug } = req.body
        if (!name || !slug) {
            return res.status(400).json({ message: "name and slug required" })
        }

        const existing = await category.findOne({ slug })

        if (existing) {
            return res.status(400).json({ message: "slug already exists" })
        }

        const createCategory = await category.create({ name, slug })

        return res.status(201).json({ message: "category created", createCategory })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}