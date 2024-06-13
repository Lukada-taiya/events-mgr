
const isauthenticated = (req: any, res : any, next: any) => {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if(!isLoggedIn) {
        return res.json(401).json({
            isSuccess: true,
            message: 'User is unauthorized'
        })
    }
    next();
}
export default isauthenticated;