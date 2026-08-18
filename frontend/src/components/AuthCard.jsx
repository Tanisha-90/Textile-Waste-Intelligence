// AuthCard.jsx

// White reusable authentication card
function AuthCard({children}){
    return(
        <div className="bg-white rounded-3xl text-stone-700 shadow-2xl p-10 w-full max-w-lg">
            {children}
        </div>
    )
}

export default AuthCard;