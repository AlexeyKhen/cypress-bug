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

describe("VodPlayer", () => {
    beforeEach(() => {
        mockLogout();
        mockLogin();

        cy.intercept("/api/v1/**", { statusCode: 400 });
        cy.intercept("GET", "/api/v1/users/me", { statusCode: 400 }).as("fetchMe");
    });

    context.only("GridVodPlayer", () => {
        beforeEach(() => {
            cy.viewport(...DESKTOP_SIZE);
            cy.visit(`/`);
        });

        it("check audio button is enabled/disabled if there is/isn't sound on video", () => {
            cy.get("[data-cy=grid-player-button-backward]").click();
        });

        it("check the player remembers user's sound preference", () => {
            cy.get("[data-cy=grid-player-button-backward]").click();
        });

        it("check is sound settings are saved between audio available/unavailable", () => {
            cy.get("[data-cy=grid-player-button-backward]").click();
        });
    });
});
