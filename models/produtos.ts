import mongoose from "mongoose"

const produtosSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    qtd: {type: Number},
    price: {type: Number},
    type: {type: String},
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            return ret
        }
    }
})

export default mongoose.model('Produtos', produtosSchema)