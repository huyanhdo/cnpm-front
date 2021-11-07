import styles from './menu.module.css'
const ItemMenu = () =>{
    return (
        <div className={styles.menu_list}>
            <div className={styles.menu_category}>
                Menu category
            </div>
            <div className={styles.category}>
                <div className={styles.overlap4}>
                    <div className={styles.overlap31}>
                        <div className ={styles.food_name}>
                        Món chính
                        </div>
                        <hr className={styles.hr}/>
                        <p><i className={styles.arrow }></i></p>
                    </div>
                    
                </div>
                <div className={styles.overlap3}>
                    <div className={styles.overlap31}>
                        <div className ={styles.food_name}>
                        Tráng miệng
                        </div>
                        <hr className={styles.hr}/>
                        <p><i className={styles.arrow }></i></p>
                    </div>
                </div>
                <div className={styles.overlap3}>
                    <div className={styles.overlap31}>
                        <div className ={styles.food_name}>
                        Món trẻ em
                        </div>
                        <hr className={styles.hr}/>
                        <p><i className={styles.arrow }></i></p>
                    </div>
                </div>
                <div className={styles.overlap3}>
                    <div className={styles.overlap31}>
                        <div className ={styles.food_name}>
                        Món chay
                        </div>
                        <hr className={styles.hr}/>
                        <p><i className={styles.arrow }></i></p>
                    </div>
                </div>
                <div className={styles.overlap3}>
                    <div className={styles.overlap31}>
                        <div className ={styles.food_name}>
                        Ăn kèm
                        </div>
                        <hr className={styles.hr}/>
                        <p><i className={styles.arrow }></i></p>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
};
export default ItemMenu