const express=require('express')
const router=express.Router()
const dotaHeroes=require('./dotaHeroesData.js')


// GET retrieve the entire list
router.get('/heros/list',(req,res)=>{
    res.send(dotaHeroes)
})


// GET heros by query parameters 
router.get('/heros',(req,res)=>{
    const searchByRole=req.query.role
    const filteredHerosByRole=dotaHeroes.filter(item=>item.role && item.role===searchByRole)
    if(!filteredHerosByRole.length){
        return res.status(404).send({
            msg:'No such role.'
        })
    }
    return res.status(200).send(filteredHerosByRole)
})


// POST add a new hero
router.post('/heros',(req,res)=>{
    const newHero=req.body
    dotaHeroes.push(newHero)
    res.status(200).send({
        msg:'New hero added successfully.'
    })
    console.log(dotaHeroes)
})


// GET activities based on hero's name    
router.get('/heros/:name',(req,res)=>{
    let heroName=req.params.name
    heroName=heroName.charAt(0).toUpperCase()+heroName.slice(1)
    const searhHero=dotaHeroes.find(item=>item.name===heroName)
    if(!searhHero){
        return res.status(404).send({
            msg:'No such hero.'
        })
    }
    res.status(200).send(searhHero)
})


// PUT update hero
router.put('/heros/:name',(req,res)=>{
    let heroName=req.params.name
    const heroUpdated=req.body
    const heroToUpdate=dotaHeroes.find(item=>item.name===heroName)
    heroName=heroName.charAt(0).toUpperCase()+heroName.slice(1)
    Object.assign(heroToUpdate,heroUpdated)
    if(!heroToUpdate){
       return  res.status(404).send({
            msg:'No such hero.'
        })
    }
    res.status(200).send({
        msg:'hero updated successfully.'
    })
})



// DELETE items based on name
router.delete('/heros/:name',(req,res)=>{
    let heroName=req.params.name
    heroName=heroName.charAt(0).toUpperCase()+heroName.slice(1)
    const indexOfHeroToDelete=dotaHeroes.findIndex(item=>item.name===heroName)
    const heroDeleted=dotaHeroes.splice(indexOfHeroToDelete,1)
    if(indexOfHeroToDelete===-1){
      return  res.status(404).send({
            msg:'No such hero.'
        })
    }
    return res.status(200).send({
        msg:'Hero has been deleted successfullly.',
        deletedHero: heroDeleted
    })
})

module.exports=router