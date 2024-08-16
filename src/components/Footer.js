import React from 'react'
import './Footer.css'

import { useTranslation } from "react-i18next";

const Footer = () => {

    const { t, i18n } = useTranslation();

    if (i18n.language === "en") {

        return (

            <div className='myFooter'>
                <footer>

                    Designed and developed by Courses4Arab.com

                    {" "}<span>&#129505;</span>{" "}
                </footer>
            </div>

        )

    } else if (i18n.language === "ar") {

        return (

            <div className='myFooter' dir="rtl">
                <footer>

                    تم التصميم والبرمجة بواسطة على حسن

                    {" "}<span>&#129505;</span>{" "}
                </footer>
            </div>

        )

    }
}

export default Footer;