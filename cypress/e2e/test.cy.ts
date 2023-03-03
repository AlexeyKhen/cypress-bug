const DESKTOP_SIZE: [number, number] = [1920, 1080];

export const mockLogout = () => {
    cy.window().then((win) => {
        win.localStorage.removeItem("token");
    });
};

export const mockLogin = () => {
    cy.window().then((win) => {
        win.localStorage.setItem(
            "token",
            JSON.stringify({
                accessToken:
                    "aaaaaaaaaaaa.bbbbbb.cccccccccccccccccc-dddd-eeeeeeeeeeeeeeeeeee",
                refreshToken: "aaaaaaaaaaaaaaaaaaaa-bbbbbbbbbbbbbbbbbbbbbb",
                tokenType: "bearer",
                expiresIn: 1800,
                issuedAt: new Date().toString(),
            }),
        );
    });
};

describe("describe bug", () => {
    beforeEach(() => {
        mockLogout();
        mockLogin();

        cy.intercept("/api/v1/**", { statusCode: 400 });
        cy.intercept("GET", "/api/v1/users/me", { statusCode: 400 }).as("fetchMe");
    });

    context("context bug", () => {
        beforeEach(() => {
            cy.viewport(...DESKTOP_SIZE);
            cy.visit(`/`);
        });

        it("test bug", () => {
            cy.get("[data-cy=button-backward]").click();
        });

        it("test bug", () => {
            cy.get("[data-cy=button-backward]").click();
        });

        it("test bug", () => {
            cy.get("[data-cy=button-backward]").click();
        });
    });
});
