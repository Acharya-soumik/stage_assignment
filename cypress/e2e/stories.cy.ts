describe("Stories Feature", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display horizontally scrollable story list", () => {
    cy.get('[data-testid="story-list"]').should("be.visible");
  });

  it("should open story preview on click", () => {
    cy.get('[data-testid="story-item"]').first().click();
    cy.get("img").should("be.visible");
  });

  it("should navigate between stories", () => {
    cy.get('[data-testid="story-item"]').first().click();
    cy.get("img").should("be.visible");

    // Click right side to go next
    cy.get("#right_handler").click();

    // Click left side to go back
    cy.get("#left_handler").click();
  });

  it("should close story on clicking close button", () => {
    cy.get('[data-testid="story-item"]').first().click();
    cy.get("button").contains("x").click();
    cy.get("#item_story").should("not.exist");
  });

  it("should auto navigate to next story after timeout", () => {
    cy.get('[data-testid="story-item"]').first().click();
    cy.get("img").should("be.visible");
    cy.wait(5000);
    cy.get("img").should("be.visible");
  });
});
