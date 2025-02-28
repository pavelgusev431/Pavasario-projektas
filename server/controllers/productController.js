

// Užklausa vartotojo produktams gauti
const getUserProducts = async (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Netinkamas vartotojo ID formatas" });
  }

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Product, attributes: ["name", "price"] }],
    });

    if (!user) {
      return res.status(404).json({ message: "Vartotojas nerastas" });
    }

    res.json(user.Products); // ⬅️ Pataisyta, kad grąžintų tik produktus
  } catch (err) {
    console.error(err);
    res.status(500).send("Klaida gaunant duomenis");
  }
};

export { getUserProducts };


