/*
db.disks.aggregate([{$match:{_id: ObjectId('5962a844b9d52c1a39c1f95b')}},{$project:{_id:0,attr_section:1}},{$unwind:"$attr_section"},{$addFields:{"attr_section.time":"$updated"}},{$replaceRoot:{newRoot:"$attr_section"}},{$project:{"values":{$filter:{input:"$items",as:"item",cond:{$eq:["$$item.time","time"]}}}}}]).pretty()

db.disks.aggregate([{$match:{_id: ObjectId('5962a844b9d52c1a39c1f95b')}},{$project:{_id:0,attr_section:1}},{$unwind:"$attr_section"},{$addFields:{"attr_section.time":"$updated"}},{$replaceRoot:{newRoot:"$attr_section"}},{$match:{attr_id:245}},{$project:{values:{$filter:{input:"$values",as:"item",cond:{$eq:["$$item.time",1499691330075]}}}}}]).pretty()

db.disks.aggregate([{$match:{_id: ObjectId('5962a844b9d52c1a39c1f95b')}},{$project:{_id:0,attr_section:1}},{$unwind:"$attr_section"},{$addFields:{"attr_section.time":"$updated"}},{$replaceRoot:{newRoot:"$attr_section"}},{$match:{attr_id:245}},{$project:{value:{$filter:{input:"$values",as:"value",cond:{$eq:["$$value.time",$time]}}}}}]).pretty()


*/

db.disks.aggregate([
  {$match:{_id: ObjectId('5962a844b9d52c1a39c1f95b')}},
  {$addFields:{"attr_section.updtime":"$updated"}},
  {$project:{_id:0,attr_section:1}},
  {$unwind:"$attr_section"},
  {$replaceRoot:{newRoot:"$attr_section"}},
  {$project:{
    values:{$filter:{
      input:"$values",
      as:"value",
      cond:{$eq:["$$value.time","$$ROOT.updtime"]}}
    },
    attr_id:1,
    name:1,
    thresh:1,
    attr_type:1,
    updated:1,
    failed:1
  }}
])
