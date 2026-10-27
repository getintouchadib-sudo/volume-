import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 900})
        await page.goto("http://localhost:5173")
        await page.wait_for_timeout(1000)

        # Click on LEARN tab
        await page.get_by_role("button", name="LEARN", exact=True).click()
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/learn_lesson_a.png")

        # Click on Lesson B
        await page.get_by_text("Litres to Millilitres (Decimals)").click()
        await page.wait_for_timeout(500)
        # Click Show Steps
        await page.get_by_role("button", name="Show Steps").first.click()
        await page.wait_for_timeout(300)
        await page.screenshot(path="/home/jules/verification/screenshots/learn_lesson_b.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
