export const getProfileData = async (req, res) => {
    try {
        return res.json({
            success: true,
            message: "Successfully loaded profile data.",
        });
    }
    catch (error) {
        return res.json({ success: false, message: "Something went wrong." });
    }
};
//# sourceMappingURL=profile.js.map