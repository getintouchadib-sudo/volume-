import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 900})
        await page.goto("http://localhost:5173")
        await page.wait_for_timeout(1000)

        # 1. Verify Assessment tab is gone from Header
        assessment_btn = page.get_by_role("button", name="Assessment")
        assert await assessment_btn.count() == 0, "Assessment button should be removed"

        # 2. Go to GAME tab
        await page.get_by_role("button", name="GAME", exact=True).click()
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/game_part_a_initial.png")

        # Check that Part B button is disabled
        part_b_btn = page.get_by_role("button").filter(has_text="Part B")
        assert await part_b_btn.is_disabled(), "Part B should be disabled initially"

        # 3. Match pairs in Part A
        pairs = [
            ("4 L", "4,000 mL"),
            ("9 L", "9,000 mL"),
            ("15 L", "15,000 mL"),
            ("2.5 L", "2,500 mL"),
            ("11 L", "11,000 mL"),
            ("14 L", "14,000 mL")
        ]

        for valA, valB in pairs:
            await page.get_by_text(valA, exact=True).click()
            await page.wait_for_timeout(200)
            await page.get_by_text(valB, exact=True).click()
            await page.wait_for_timeout(300)

        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/game_part_a_passed.png")

        # Click Proceed to Part B
        await page.get_by_role("button", name="Proceed to Part B →").click()
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/game_part_b_start.png")

        # 4. Complete Part B questions
        fill_answers = ["6,000 mL", "12 L", "8 L", "15,000 mL", "10,500 mL", "13,000 mL"]
        for ans in fill_answers:
            await page.get_by_role("button", name=ans, exact=True).click()
            await page.wait_for_timeout(200)
            await page.get_by_role("button", name="Submit Answer").click()
            await page.wait_for_timeout(200)
            next_btn = page.get_by_role("button", name="Next Question →")
            if await next_btn.count() > 0 and await next_btn.is_visible():
                await next_btn.click()
                await page.wait_for_timeout(200)

        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/game_part_b_passed.png")

        # Click Proceed to Part C
        await page.get_by_role("button", name="Proceed to Part C →").click()
        await page.wait_for_timeout(500)

        # 5. Complete Part C statements
        mc_answers = [False, True, True, False, True, False]
        for is_true in mc_answers:
            btn_name = "CORRECT" if is_true else "FALSE / INCORRECT"
            await page.get_by_role("button", name=btn_name, exact=True).click()
            await page.wait_for_timeout(200)
            next_btn = page.get_by_role("button", name="Next Statement →")
            if await next_btn.count() > 0 and await next_btn.is_visible():
                await next_btn.click()
                await page.wait_for_timeout(200)

        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/screenshots/game_part_c_certificate.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
