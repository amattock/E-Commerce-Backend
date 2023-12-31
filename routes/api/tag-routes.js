const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
      model: Product,
      through: ProductTag,
      as: 'products'
    }],
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include: [{
      model: Product,
      through: ProductTag,
      as: 'products'
    }],
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id
    },
    })
    .then((dbTagData) => {
      res.json(dbTagData);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((dbTagData) => {
    res.json(dbTagData);
  });
});

module.exports = router;
