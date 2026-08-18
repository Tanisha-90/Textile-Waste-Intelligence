FABRIC_IDS = {

    "Cotton":1,

    "Polyester":2,

    "Denim":3,

    "Silk":4,

    "Wool":5,

    "Linen":6,

    "Velvet":7,

    "Nylon":8,

    "Fleece":9,

    "Terrycloth":10

}



def get_fabric_id(material):

    return FABRIC_IDS.get(material,0)