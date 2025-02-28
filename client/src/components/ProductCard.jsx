export default function ProductCard({ product }) {
  return(
    <>
      <div>
        
        <div><img src={product.image_url} alt={product.name} /></div>
        <h2>{product.name}</h2>
        <div>{product.price}</div>
      </div>
    </>
  )
}