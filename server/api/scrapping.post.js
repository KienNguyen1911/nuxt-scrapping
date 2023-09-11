import puppeteer from "puppeteer"

export default defineEventHandler(async (event) => {
    let url = "https://www.youtube.com/watch?v=5WkwBKu1le0&list=RDEMYeJUfMi0IwutR9IZ3z8Txw&index=9&ab_channel=MCK%2F%2FNger"
    const link = readBody(event).then((res) => {
        console.log(res)
        url = res.url
        return res.url
    }).catch((err) => {
        console.log(err)
    })
    const dataSet = {}
    try {
        const browser = await puppeteer.launch({headless: 'new'});
        const page = await browser.newPage();
        await page.goto(url);

        if (!url) {
            return {
                data: "No url"
            }
        } else {
            // Navigate the page to a URL
            await page.goto(url);
          
            // Set screen size
            await page.setViewport({width: 1280, height: 1024});

            await page.screenshot({ path: 'example.png' });
          
            const dataSet = await page.evaluate(() => {
                const listImageLink = [];
                const nameProduct = document.querySelector("#listing-page-cart .wt-mb-xs-1 .wt-text-body-01")?.innerText;
                const listImage = document.querySelectorAll(".image-carousel-container .carousel-pane .carousel-image");
                listImage.forEach((element) => {
                    let imageLink = element.getAttribute("data-src");
                    if (!imageLink) {
                        imageLink = element.getAttribute("src");
                    }
                    listImageLink.push(imageLink);
                });
                return Promise.resolve({
                    nameProduct,
                    listImageLink
                });
            });
            console.log(dataSet)
            await browser.close();
            console.log("\n🎉 GitHub profile screenshot captured successfully.");
            return dataSet
        }
    } catch (error) {
        console.log('Cannot go to the page')        
    }
    return dataSet
  })
  