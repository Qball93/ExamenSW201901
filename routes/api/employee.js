var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
     ** GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

router.get('/all', (req, res, next) => {  
  empModel.getEmployees(
    function(err, docs){
      if(err) {
        console.log(err);
        return res.status(500).json({error:"Algo Paso"});
      }
      return res.status(200).json(docs);
  })
});// all

router.get('/byid/:id', (req, res, next) => {
  empModel.getEmployeesById(req.params.id, (err, employeeDoc) =>{
    if(err){
      console.lod(err);
      return res.status(500).json({"error":"Error al obetener datos"});
    }else{
      return res.status(200).json(employeeDoc);
    }
  });
})

router.get('/bycompany/:company', (req,res, next) => {
  empModel.getEmployeesByCompany(req.params.company, (err, employeeDoc) =>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Error al obtener datos"});
    }else{
      return res.status(200).json(employeeDoc);
    }
  })
})

router.get('/bytags/:tag', (req, res, next)=>{
  empModel.getEmployeesByTag((req.params.tag || '').split('_'), (err, docs)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error al obtener datos"});
    }else{
      return res.status(200).json(docs);
    }
  } ); //searchByTag
});// by tag

router.post('/addtag/:id', (req, res, next)=>{
  empModel.addEmployeeATag(req.body.tag,req.params.id, (err, rsult)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se puede actualizar la tag"});
    }
    return res.status(200).json(rsult);
  });// end addTagsToThing
});// addtags
  

router.delete('/delete/:id', function(req, res, next){
  var employeeId = req.params.id;
  empModel.removeEmployee(employeeId, (err,result) =>{
    if(err){
      return res.status(500).json({"error":"No se pudo eliminar"})
    }
    return res.status(200).json(result);
  })
})
  return router;
}

module.exports = initEmployee;
