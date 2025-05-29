import { Router } from "express";
import { PrismaClient } from "../../../../../generated/prisma/index.js";

const prisma = new PrismaClient()
export const myRouter = Router()


myRouter.get("/", async (req, res, next) => {
try {
    const getBusinesses = await prisma.business.findMany({
        include: {
            category: {
                select: {
                    name: true,
                    icon: true
                }
            }
        }
    })
    res.json(getBusinesses)
} catch (error) {
    next(error)
}
})

myRouter.get("/:id", async (req, res, next) => {
try {
    const {id} = req.params
    const getBusinessById = await prisma.business.findUnique({
        where: {
            id
        }
    })
    res.json(getBusinessById)
} catch (error) {
    next(error)
}
})

myRouter.post("/", async (req, res, next) => {
try {
    const {
      name,
      slug,
      description,
      address,
      latitude,
      longitude,
      phone,
      email,
      website,
      hours,
      images,
      verified,
      features,
      categoryId,
    } = req.body

    const newBusiness = await prisma.business.create({
        data: {
        name,
        slug,
        description,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        phone,
        email,
        website,
        hours,
        images,
        verified: verified ?? false,
        features: features ?? false,
        categoryId,
        }
    })
    res.json(newBusiness)
} catch (error) {
    next(error)
}
})

myRouter.put("/:id", async (req, res, next) => {
try {
  const {id} = req.params
  const {
      name,
      slug,
      description,
      address,
      latitude,
      longitude,
      phone,
      email,
      website,
      hours,
      images,
      verified,
      features,
      categoryId,
    } = req.body

  const updateBusiness = await prisma.business.update({
    where: {
        id
    },
    data: {
        name,
        slug,
        description,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        phone,
        email,
        website,
        hours,
        images,
        verified: verified ?? false,
        features: features ?? false,
        categoryId,
    }
  })
  res.json(updateBusiness)
} catch (error) {
    next(error)
}
})

myRouter.delete("/:id", async (req, res, next) => {
try {
  const {id} = req.params
  const deleteBusiness = await prisma.business.delete({
    where: {
        id
    }
  })
  res.json(deleteBusiness)
} catch (error) {
    next(error)
}
})

myRouter.get("/reviews/business/:businessId", async (req, res, next) => {
try {
    const {businessId} = req.params
    const reviews = await prisma.review.findMany({
        where: {
            businessId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    res.json(reviews)
} catch (error) {
    next(error)
}
})

myRouter.post("/reviews", async (req, res, next) => {
try {
    const {
     name,
     email,
     rating,
     comment,
     businessId
    } = req.body

    const createReview = await prisma.review.create({
        data: {
            name,
            email,
            rating: parseInt(rating),
            comment,
            businessId
        }
    })
    res.json(createReview)
} catch (error) {
   next(error) 
}
})