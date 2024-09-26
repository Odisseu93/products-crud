#!/usr/bin/sh

# Please install JSON processor jq - Doc: https://jqlang.github.io/jq/

get_all_products () {
    curl -H "Content-type: application/json" \
        -X GET http://localhost:3000/product/get/all | jq
}

delete_product () {
    echo 'Insert the product id and press Enter: '
    read -r product_id

    curl -d "{}" \
        -H "Content-type: application/json" \
        -X DELETE http://localhost:3000/product/delete/$product_id
}

create_product () {
    echo 'Insert the product name and press Enter: '
    read -r name

    echo 'Insert the product type press Enter: '
    read -r price

    curl -d "{\"name\": \"$name\", \"price\": $price }" \
        -H "Content-type: application/json" \
        -X POST http://localhost:3000/product/create
}

update_product () {
    echo 'Insira o ID do produto e pressione Enter: '
    read -r id_produto

    echo 'Insira o novo nome do produto e pressione Enter: '
    read -r novo_nome

    echo 'Insira o novo preço do produto e pressione Enter: '
    read -r novo_preco

    curl -d "{\"name\": \"$novo_nome\", \"price\": $novo_preco}" \
        -H "Content-type: application/json" \
        -X PUT "http://localhost:3000/product/update/$id_produto" | jq
}

get_product_by_id () {
    echo 'Insira o ID do produto e pressione Enter: '
    read -r id_produto

    curl -H "Content-type: application/json" \
        -X GET "http://localhost:3000/product/get/$id_produto" | jq
}
